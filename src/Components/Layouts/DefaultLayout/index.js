
import Header from "../../Header";

function DefaultLayout({children}) {
    return (
        <>
        <Header/>
        <div className="container">
            {children}
        </div>
        </>
    )
}

export default DefaultLayout;