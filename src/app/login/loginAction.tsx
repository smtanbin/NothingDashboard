import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Database from "../../../model/database";

export default async function loginAction(formData: FormData) {
    "use server";

    const username = formData.get("username")?.toString().trim() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    if (!username || !password) {
        redirect(`/login?error=${Buffer.from("Please fill in all fields").toString("base64")}`);
    }

    // TODO(security): Replace with real DB lookup + Argon2/bcrypt verification
    const db = new Database();
    db.qurry("SELECT * FROM user WHERE username = :username", [username]);

    // Mock credential check — swap with real hash comparison
    if (username !== "admin" || password !== "admin") {
        redirect(`/login?error=${Buffer.from("Invalid username or password").toString("base64")}`);
    }

    const sessionId = crypto.randomUUID();

    // Set cookie server-side — this is the correct way inside a Server Action
    const cookieStore = await cookies();
    cookieStore.set("PHPSESSID", sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 8, // 8 hours
    });

    redirect("/home");
}

