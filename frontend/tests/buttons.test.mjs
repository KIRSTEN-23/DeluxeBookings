import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { transformWithOxc } from 'vite';

const source = await readFile(new URL('../src/components/common/AppButton.jsx', import.meta.url), 'utf8');
const transformed = await transformWithOxc(source, 'AppButton.jsx', { jsx: { runtime: 'automatic' } });
const code = transformed.code.replace(/from ["'](react(?:\/jsx-runtime)?)["']/g, (_, name) => `from "${import.meta.resolve(name)}"`);
const { default: AppButton } = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
const element = (props = {}) => AppButton.render(props, null);

test('action buttons do not submit forms unless explicitly requested', () => {
  assert.equal(element().props.type, 'button');
  assert.equal(element({ type: 'submit' }).props.type, 'submit');
  assert.equal(element({ as: 'a', href: '/browse' }).props.type, undefined);
});

test('disabled and loading actions block handlers, including navigation links', () => {
  for (const state of [{ disabled: true }, { loading: true }]) {
    let activated = false;
    const button = element({ ...state, onClick: () => { activated = true; } });
    assert.equal(button.props.disabled, true);
    const link = element({ ...state, as: 'a', href: '/browse', onClick: () => { activated = true; } });
    assert.equal(link.props['aria-disabled'], true);
    assert.equal(link.props.tabIndex, -1);
    let prevented = false;
    link.props.onClick({ preventDefault: () => { prevented = true; } });
    assert.equal(prevented, true);
    assert.equal(activated, false);
  }
  assert.equal(element({ loading: true }).props['aria-busy'], true);
});

test('icon-only actions preserve an accessible name and optional icons can be omitted', () => {
  const Icon = () => null;
  const named = element({ icon: Icon, iconOnly: true, 'aria-label': 'Close listing' });
  assert.equal(named.props['aria-label'], 'Close listing');
  assert.equal(named.props.children[2].props['aria-hidden'], 'true');
  const plain = element({ icon: Icon, showIcon: false, children: 'Save' });
  assert.equal(plain.props.children[2], null);
  assert.equal(plain.props.children[1], 'Save');
});
