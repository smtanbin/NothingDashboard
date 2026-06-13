import { redirect } from "next/navigation";
import Database from "../../../../model/database";

export default async function recoverAction(formData: FormData) {
    "use server";

    const email = formData.get("email")?.toString().trim() ?? "";

    if (!email) {
        redirect(`/login/recover?error=${Buffer.from("Please enter your email address.").toString("base64")}`);
    }

    const db = new Database();
    db.qurry("SELECT * FROM user WHERE email = :email", [email]);

    // Dummy logic
    if (email !== "admin@example.com") {
        redirect(`/login/recover?error=${Buffer.from("Email address not found.").toString("base64")}`);
    }

    redirect(`/login/recover?message=${Buffer.from("Reset link sent successfully.").toString("base64")}`);
}
