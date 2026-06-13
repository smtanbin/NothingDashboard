import { getDictionary, defaultLocale } from "@/i18n";
import registerAction from "./registerAction";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const { error } = await searchParams;
    const rawError = Array.isArray(error) ? error[0] : error;

    let errorMessage: string | undefined;
    if (rawError) {
        try {
            errorMessage = Buffer.from(rawError, "base64").toString("utf-8");
        } catch {
            errorMessage = undefined;
        }
    }

    const dict = await getDictionary(defaultLocale);
    const t = dict.register;

    return (
        <div>
            <p className="login-box-msg text-center text-muted mb-3">{t.tagline}</p>

            {errorMessage && (
                <div className="alert alert-danger py-2 px-3 small rounded mb-3">
                    <i className="bi bi-x-circle-fill me-2"></i> {errorMessage}
                </div>
            )}

            <form action={registerAction}>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        name="fullName"
                        className="form-control"
                        placeholder={t.fullName}
                        required
                    />
                    <div className="input-group-text">
                        <span className="bi bi-person"></span>
                    </div>
                </div>

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

                <div className="input-group mb-3">
                    <input
                        type="password"
                        name="retypePassword"
                        className="form-control"
                        placeholder={t.retypePassword}
                        required
                    />
                    <div className="input-group-text">
                        <span className="bi bi-shield-lock"></span>
                    </div>
                </div>

                <div className="row align-items-center">
                    <div className="col-8">
                        <div className="form-check m-0">
                            <input type="checkbox" name="agree" value="true" className="form-check-input" id="agreeTerms" style={{ cursor: "pointer" }} />
                            <label className="form-check-label" htmlFor="agreeTerms" style={{ fontSize: "13px", cursor: "pointer", userSelect: "none" }}>
                                {t.agreeTerms} <a href="#" className="text-decoration-none" style={{ color: "#0d6efd" }}>{t.terms}</a>
                            </label>
                        </div>
                    </div>
                    <div className="col-4">
                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                        >
                            {t.registerButton}
                        </button>
                    </div>
                </div>
            </form>

            <div className="mt-3 pt-3 border-top small">
                <a href="/login" className="text-decoration-none" style={{ color: "#0d6efd" }}>
                    {t.alreadyMember}
                </a>
            </div>
        </div>
    );
}
