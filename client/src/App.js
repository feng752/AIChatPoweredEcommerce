import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import Home from "./pages/HomePage";
import ProductDetail from "./pages/ProductDetailPage";
import About from "./pages/AboutPage";
import Checkout from "./pages/CheckoutPage";
import AuthPages from "./pages/AuthPages";
import Contact from "./pages/ContactPage";
import Confirmation from "./pages/ConfirmationPage";
import NavbarMenu from "./components/NavbarMenu";
import Footer from "./components/Footer";
import { CartWrapper } from "./components/CartContext";
import TechSupport from "./pages/TechSupport";
import TechSupport2 from "./pages/TechSupport2";
import { useDispatch, useSelector } from "react-redux";
import { checkLoginSession } from "./store/actions/authActions";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/auth/login" />
                )
            }
        />
    );
};

export default function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkLoginSession());
    }, [dispatch]);

    return (
        <CartWrapper>
            <Router>
                <NavbarMenu />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route
                        path="/productdetail/:id"
                        component={ProductDetail}
                    />
                    <Route path="/about" component={About} />
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/confirmation" component={Confirmation} />
                    <ProtectedRoute
                        path="/techsupport"
                        component={TechSupport}
                    />
                    <Route path="/auth" component={AuthPages} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/techsupport2" component={TechSupport2} />
                </Switch>
                <Footer />
            </Router>
        </CartWrapper>
    );
}
