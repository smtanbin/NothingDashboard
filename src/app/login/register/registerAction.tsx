import { redirect } from "next/navigation";
import Database from "../../../../model/database";

export default async function registerAction(formData: FormData) {
    "use server";

    const fullName = formData.get("fullName")?.toString().trim() ?? "";
    const email = formData.get("email")?.toString().trim() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    const retypePassword = formData.get("retypePassword")?.toString() ?? "";
    const agree = formData.get("agree")?.toString() ?? "";

    if (!fullName || !email || !password || !retypePassword) {
        redirect(`/login/register?error=${Buffer.from("Please fill in all fields.").toString("base64")}`);
    }

    if (password !== retypePassword) {
        redirect(`/login/register?error=${Buffer.from("Passwords do not match.").toString("base64")}`);
    }

    if (!agree) {
        redirect(`/login/register?error=${Buffer.from("You must agree to the terms.").toString("base64")}`);
    }

    const db = new Database();
    db.qurry(
        "INSERT INTO user (username, password, email) VALUES (:username, :password, :email)",
        [fullName, password, email]
    );

    // Redirect to login on successful dummy registration
    redirect(`/login?message=${Buffer.from("Registration successful! Please sign in.").toString("base64")}`);
}
