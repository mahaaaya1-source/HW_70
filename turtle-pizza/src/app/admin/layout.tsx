import Link from 'next/link';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container py-3" style={{ maxWidth: 760 }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h4 m-0">Turtle Pizza Admin</h1>

        <div className="d-flex gap-2">
          <Link className="btn btn-link" href="/admin/dishes">
            Dishes
          </Link>
          <Link className="btn btn-link" href="/admin/orders">
            Orders
          </Link>
        </div>
      </div>

      {children}
    </div>
  );
};

export default AdminLayout;
