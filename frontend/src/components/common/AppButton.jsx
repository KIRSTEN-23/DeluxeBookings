import { forwardRef } from "react";

/** Shared action button. Use `as={Link}` for navigation and `type="submit"` for forms. */
const AppButton = forwardRef(function AppButton({
  as: Component = "button",
  intent = "primary",
  appearance = "fill",
  onDark = false,
  icon: Icon,
  showIcon = true,
  iconPosition = "end",
  iconOnly = false,
  loading = false,
  disabled = false,
  className = "",
  children,
  onClick,
  type,
  tabIndex,
  ...props
}, ref) {
  const unavailable = disabled || loading;
  const isButton = Component === "button";
  const icon = showIcon && Icon ? <Icon aria-hidden="true" focusable="false" /> : null;

  return (
    <Component
      {...props}
      ref={ref}
      type={isButton ? type || "button" : undefined}
      className={`app-button ${className}`.trim()}
      data-intent={intent}
      data-appearance={appearance}
      data-surface={onDark ? "dark" : "light"}
      data-icon={showIcon}
      data-icon-only={iconOnly || undefined}
      disabled={isButton ? unavailable : undefined}
      aria-disabled={!isButton && unavailable ? true : undefined}
      aria-busy={loading || undefined}
      tabIndex={!isButton && unavailable ? -1 : tabIndex}
      onClick={(event) => {
        if (unavailable) { event.preventDefault(); return; }
        onClick?.(event);
      }}
    >
      {iconPosition === "start" && icon}
      {children}
      {iconPosition !== "start" && icon}
    </Component>
  );
});

export default AppButton;
