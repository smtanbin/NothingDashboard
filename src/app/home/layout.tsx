
import Template from "./Template";
import { AuthProvider } from "@/context/AuthContext";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {


    return (
        <AuthProvider>
            <Template>{children}</Template>
        </AuthProvider>
    );
}