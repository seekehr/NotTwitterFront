
import { Layout } from "@/components/Layout";

const Index = () => {
  return (
    <Layout>
      <div className="p-4 border-b border-sidebar-border">
        <h1 className="font-bold text-xl">Home</h1>
      </div>
      <div className="p-4">
        <p className="text-gray-500">Welcome to NotTwitter! Start your journey by following people and sharing your thoughts.</p>
      </div>
    </Layout>
  );
};

export default Index;
