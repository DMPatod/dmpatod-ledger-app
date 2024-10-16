import Link from "next/link";

const Index = () => {
  return (
    <div>
      <main>
        <ul>
          <li>
            <Link href="/orders">Visualize Orders</Link>
          </li>
          <li>
            <Link href="/products">Visualize Products</Link>
          </li>
          <li>
            <Link href="/providers">Visualize Providers</Link>
          </li>
          <li>
            <Link href="/tickets">Visualize Tickets</Link>
          </li>
          <li>
            <Link href="/tickets/create"></Link>
          </li>
        </ul>
      </main>
    </div>
  );
};

export default Index;
