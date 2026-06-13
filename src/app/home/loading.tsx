export default function Loading() {
    return (
        <div className="wrapper" style={{ background: "#ecf0f5", height: "100vh" }}>
            <section className="content" style={{ paddingTop: "200px", textAlign: "center" }}>
                <div className="box box-primary" style={{ display: "inline-block", padding: "30px 50px" }}>
                    <i className="fa fa-spinner fa-spin" style={{ fontSize: "35px", color: "#3c8dbc" }} />
                </div>
            </section>
        </div>
    );
}