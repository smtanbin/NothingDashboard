import { getDictionary, defaultLocale } from "@/i18n";
import recoverAction from "./recoverAction";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const { error, message } = await searchParams;
    const rawError = Array.isArray(error) ? error[0] : error;
    const rawMessage = Array.isArray(message) ? message[0] : message;

    let errorMessage: string | undefined;
    if (rawError) {
        try {
            errorMessage = Buffer.from(rawError, "base64").toString("utf-8");
        } catch {
            errorMessage = undefined;
        }
    }

    let successMessage: string | undefined;
    if (rawMessage) {
        try {
            successMessage = Buffer.from(rawMessage, "base64").toString("utf-8");
        } catch {
            successMessage = undefined;
        }
    }

    const dict = await getDictionary(defaultLocale);
    const t = dict.recover;

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

            <form action={recoverAction}>
                <div className="input-group mb-3">
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder={t.email}
                        required
                    />
                    <div className="input-group-text">
                        <span className="bi bi-envelope"></span>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                        >
                            {t.requestReset}
                        </button>
                    </div>
                </div>
            </form>

            <div className="mt-3 pt-3 border-top small">
                <a href="/login" className="text-decoration-none" style={{ color: "#0d6efd" }}>
                    {t.backToLogin}
                </a>
            </div>
        </div>
    );
}
