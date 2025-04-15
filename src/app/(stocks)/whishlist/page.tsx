import WhishlistPage from '@/src/pages/Whishlist';
export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-4 py-4">Real-Time Stock Prices</h1>
            <WhishlistPage />
        </div>
    );
}
