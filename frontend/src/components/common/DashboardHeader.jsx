export default function DashboardHeader({ title, actions }) {
  return (
    <header className="dashboard-header mb-4">
      <div className="d-flex justify-content-between align-items-end gap-3 flex-wrap">
        <h1 className="dashboard-header-title mb-0">
          {title}
        </h1>

        {actions && (
          <div className="dashboard-header-actions">
            {actions}
          </div>
        )}
      </div>
    </header>
  );
}