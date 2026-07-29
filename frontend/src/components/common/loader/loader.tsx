"use client";

export default function Loader() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">

            <div className="flex flex-col items-center gap-4">

                <div className="relative h-14 w-14">

                    <div className="absolute inset-0 animate-spin rounded-full border-4 border-gray-200 border-t-black" />

                </div>


                <p className="text-sm font-medium text-gray-600">
                    Loading your tasks...
                </p>

            </div>

        </div>
    );
}