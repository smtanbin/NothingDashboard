import { getDictionary, defaultLocale } from "@/i18n";
import loginAction from "./loginAction";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const { error, message } = await searchParams;
    const rawError = Array.isArray(error) ? error[0] : error;
    const rawMessage = Array.isArray(message) ? message[0] : message;

    // Decode base64 error message — guard against malformed input
    let errorMessage: string | undefined;
    if (rawError) {
        try {
            errorMessage = Buffer.from(rawError, "base64").toString("utf-8");
        } catch {
            errorMessage = undefined;
        }
    }

    // Decode base64 success message
    let successMessage: string | undefined;
    if (rawMessage) {
        try {
            successMessage = Buffer.from(rawMessage, "base64").toString("utf-8");
        } catch {
            successMessage = undefined;
        }
    }
    const dict = await getDictionary(defaultLocale);
    const t = dict.login;

    return (
        <div>
            <p className="login-box-msg text-center text-muted mb-3">{t.tagline}</p>

            {errorMessage && (
                <div className="alert alert-danger py-2 px-3 small rounded mb-3">
                    <i className="bi bi-x-circle-fill me-2"></i> {errorMessage}
                </div>
            )}

            {successMessage && (
                <div className="alert alert-success py-2 px-3 small rounded mb-3">
                    <i className="bi bi-check-circle-fill me-2"></i> {successMessage}
                </div>
            )}

            <form action={loginAction}>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder={t.username}
                        required
                    />
                    <div className="input-group-text">
                        <span className="bi bi-person"></span>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder={t.password}
                        required
                    />
                    <div className="input-group-text">
                        <span className="bi bi-lock"></span>
                    </div>
                </div>

                <div className="row align-items-center">
                    <div className="col-8">
                        <div className="form-check m-0">
                            <input type="checkbox" name="remember" className="form-check-input" id="rememberMe" style={{ cursor: "pointer" }} />
                            <label className="form-check-label" htmlFor="rememberMe" style={{ fontSize: "13px", cursor: "pointer", userSelect: "none" }}>
                                {t.rememberMe}
                            </label>
                        </div>
                    </div>
                    <div className="col-4">
                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                        >
                            {t.signIn}
                        </button>
                    </div>
                </div>
            </form>

            <div className="mt-3 pt-3 border-top small">
                <a href="/login/recover" className="text-decoration-none d-block mb-1" style={{ color: "#0d6efd" }}>
                    {t.forgotPassword}
                </a>
                <a href="/login/register" className="text-decoration-none d-block" style={{ color: "#0d6efd" }}>
                    {t.register}
                </a>
            </div>
        </div>
    );
}
