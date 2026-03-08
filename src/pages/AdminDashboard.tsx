import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, Plus, Pencil, Trash2, Package, ShoppingBag, DollarSign, TrendingUp, X } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DbProduct {
  id: string;
  name: string;
  price: number;
  original_price: number | null;
  image: string;
  category: string;
  rating: number;
  review_count: number;
  description: string;
  features: string[];
  in_stock: boolean;
  badge: string | null;
  created_at: string;
}

interface DbOrder {
  id: string;
  user_id: string | null;
  status: string;
  total: number;
  shipping_name: string | null;
  shipping_city: string | null;
  created_at: string;
}

type Tab = "overview" | "products" | "orders";

const AdminDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const [tab, setTab] = useState<Tab>("overview");
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [orders, setOrders] = useState<DbOrder[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<DbProduct | null>(null);

  const fetchData = async () => {
    setLoadingData(true);
    const [prodRes, orderRes] = await Promise.all([
      supabase.from("products").select("*").order("created_at", { ascending: false }),
      supabase.from("orders").select("*").order("created_at", { ascending: false }),
    ]);
    if (prodRes.data) setProducts(prodRes.data as unknown as DbProduct[]);
    if (orderRes.data) setOrders(orderRes.data as unknown as DbOrder[]);
    setLoadingData(false);
  };

  useEffect(() => {
    if (isAdmin) fetchData();
  }, [isAdmin]);

  if (authLoading || adminLoading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>;
  if (!user) return <Navigate to="/auth" replace />;
  if (!isAdmin) return <div className="flex items-center justify-center min-h-[60vh]"><p className="text-muted-foreground">Access denied. Admin privileges required.</p></div>;

  const totalRevenue = orders.reduce((s, o) => s + Number(o.total), 0);
  const pendingOrders = orders.filter(o => o.status === "pending").length;

  const handleDeleteProduct = async (id: string) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) toast.error("Failed to delete product");
    else { toast.success("Product deleted"); fetchData(); }
  };

  const handleUpdateOrderStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("orders").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
    if (error) toast.error("Failed to update order");
    else { toast.success("Order updated"); fetchData(); }
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "products", label: "Products" },
    { key: "orders", label: "Orders" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <div className="flex gap-2 mb-8 border-b border-border">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${tab === t.key ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "overview" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard icon={<DollarSign className="w-5 h-5" />} label="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} />
            <StatCard icon={<ShoppingBag className="w-5 h-5" />} label="Total Orders" value={String(orders.length)} />
            <StatCard icon={<Package className="w-5 h-5" />} label="Total Products" value={String(products.length)} />
            <StatCard icon={<TrendingUp className="w-5 h-5" />} label="Pending Orders" value={String(pendingOrders)} />
          </div>
        )}

        {tab === "products" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Products ({products.length})</h2>
              <Dialog open={dialogOpen} onOpenChange={(o) => { setDialogOpen(o); if (!o) setEditingProduct(null); }}>
                <DialogTrigger asChild>
                  <Button><Plus className="w-4 h-4 mr-2" /> Add Product</Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingProduct ? "Edit Product" : "Add Product"}</DialogTitle>
                  </DialogHeader>
                  <ProductForm
                    product={editingProduct}
                    onSaved={() => { setDialogOpen(false); setEditingProduct(null); fetchData(); }}
                  />
                </DialogContent>
              </Dialog>
            </div>
            {loadingData ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : (
              <div className="border border-border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map(p => (
                      <TableRow key={p.id}>
                        <TableCell><img src={p.image} alt={p.name} className="w-10 h-10 rounded object-cover" /></TableCell>
                        <TableCell className="font-medium">{p.name}</TableCell>
                        <TableCell>${Number(p.price).toFixed(2)}</TableCell>
                        <TableCell className="capitalize">{p.category}</TableCell>
                        <TableCell>{p.in_stock ? <span className="text-success">In Stock</span> : <span className="text-destructive">Out</span>}</TableCell>
                        <TableCell className="text-right space-x-1">
                          <Button variant="ghost" size="icon" onClick={() => { setEditingProduct(p); setDialogOpen(true); }}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteProduct(p.id)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        )}

        {tab === "orders" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Orders ({orders.length})</h2>
            {loadingData ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : orders.length === 0 ? (
              <p className="text-muted-foreground text-center py-12">No orders yet.</p>
            ) : (
              <div className="border border-border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map(o => (
                      <TableRow key={o.id}>
                        <TableCell className="font-mono text-xs">{o.id.slice(0, 8)}...</TableCell>
                        <TableCell>{o.shipping_name || "N/A"}</TableCell>
                        <TableCell>${Number(o.total).toFixed(2)}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            o.status === "completed" ? "bg-success/10 text-success" :
                            o.status === "pending" ? "bg-accent/10 text-accent" :
                            o.status === "cancelled" ? "bg-destructive/10 text-destructive" :
                            "bg-muted text-muted-foreground"
                          }`}>{o.status}</span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Select value={o.status} onValueChange={(v) => handleUpdateOrderStatus(o.id, v)}>
                            <SelectTrigger className="w-32 h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="processing">Processing</SelectItem>
                              <SelectItem value="shipped">Shipped</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

const StatCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <Card>
    <CardContent className="p-6 flex items-center gap-4">
      <div className="p-3 rounded-lg bg-primary/10 text-primary">{icon}</div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </CardContent>
  </Card>
);

const ProductForm = ({ product, onSaved }: { product: DbProduct | null; onSaved: () => void }) => {
  const [form, setForm] = useState({
    name: product?.name || "",
    price: product?.price?.toString() || "",
    original_price: product?.original_price?.toString() || "",
    image: product?.image || "",
    category: product?.category || "electronics",
    description: product?.description || "",
    features: product?.features?.join(", ") || "",
    in_stock: product?.in_stock ?? true,
    badge: product?.badge || "",
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      name: form.name,
      price: parseFloat(form.price),
      original_price: form.original_price ? parseFloat(form.original_price) : null,
      image: form.image,
      category: form.category,
      description: form.description,
      features: form.features.split(",").map(f => f.trim()).filter(Boolean),
      in_stock: form.in_stock,
      badge: form.badge || null,
      updated_at: new Date().toISOString(),
    };

    let error;
    if (product) {
      ({ error } = await supabase.from("products").update(payload).eq("id", product.id));
    } else {
      ({ error } = await supabase.from("products").insert(payload));
    }
    if (error) toast.error(error.message);
    else { toast.success(product ? "Product updated" : "Product added"); onSaved(); }
    setSaving(false);
  };

  const categories = ["electronics", "fashion", "home", "sports", "books", "beauty"];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Name</Label>
        <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Price</Label>
          <Input type="number" step="0.01" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} required />
        </div>
        <div className="space-y-2">
          <Label>Original Price</Label>
          <Input type="number" step="0.01" value={form.original_price} onChange={e => setForm(f => ({ ...f, original_price: e.target.value }))} />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Image URL</Label>
        <Input value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v }))}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {categories.map(c => <SelectItem key={c} value={c} className="capitalize">{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Badge</Label>
          <Input value={form.badge} onChange={e => setForm(f => ({ ...f, badge: e.target.value }))} placeholder="e.g. Sale, New" />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
      </div>
      <div className="space-y-2">
        <Label>Features (comma-separated)</Label>
        <Input value={form.features} onChange={e => setForm(f => ({ ...f, features: e.target.value }))} />
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" id="in_stock" checked={form.in_stock} onChange={e => setForm(f => ({ ...f, in_stock: e.target.checked }))} />
        <Label htmlFor="in_stock">In Stock</Label>
      </div>
      <Button type="submit" className="w-full" disabled={saving}>
        {saving && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
        {product ? "Update Product" : "Add Product"}
      </Button>
    </form>
  );
};

export default AdminDashboard;
