var React = require("react");
var Firebase = require("firebase");
var ref = new Firebase("https://def.firebaseio.com");

var style = {
    outer: {
        display: "table",
        position: "absolute",
        height: "100%",
        width: "100%",
        backgroundImage: "linear-gradient(45deg, rgba(0,0,255,0.5), rgba(0,255,0,0.5))",
    },
    middle: {
        display: "table-cell",
        verticalAlign: "middle"
    },
    inner: {
        marginLeft: "auto",
        marginRight: "auto",
        width: "300px",
        padding: "15px 10px 0px 10px",
        background: "white",
        borderRadius: "5px"
    },
    title: {
        fontSize: "20pt",
        paddingBottom: "25px",
        fontWeight: "bold"
    },
    footer: {
        textAlign: "center"
    }
};

var LoginControl = React.createClass({
    loginUser: function(event) {
        var _this = this;
        ref.authWithPassword({
            email: this.state.email,
            password: this.state.password
        }, function(err, authData) {
            if (err) { alert(err); }
            else {
                console.log(authData);
            }
        });
        event.preventDefault();
        return false;
    },
    getInitialState: function() {
        return { email: "", password: "" };
    },
    handleEmailChange: function(event) {
        this.setState({ 
            email: event.target.value, 
            password: this.state.password
        });
    },
    handlePasswordChange: function(event) {
        this.setState({ 
            email: this.state.email, 
            password: event.target.value 
        });
    },
    render: function() {
        return <form style={style.inner} className="panel panel-default">
                    <div className="panel-body">
                        <div style={style.title}>Welcome to Vocab</div>
                        <div className="form-group">
                            <label htmlFor="emailInput" className="control-label">E-mail</label>
                            <div className="">
                                <input id="emailInput" 
                                       className="form-control" 
                                       type="text" 
                                       placeholder="Please enter e-mail"
                                       onChange={this.handleEmailChange}></input>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="passwordInput" className="control-label">Password</label>
                            <div className="">
                                <input id="passwordInput" 
                                       className="form-control" 
                                       type="password" 
                                       placeholder="Please enter password"
                                       onChange={this.handlePasswordChange}></input>
                            </div>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary form-control" type="submit" onClick={this.loginUser}>Login</button>
                        </div>
                    </div>
                    <div className="panel-footer" style={style.footer}>
                        <div>Don't have an account? <a href="#"><span onClick={this.props.switchToSignup}>Sign-up!</span></a></div>
                    </div>
               </form>;
    }
});

var SignupControl = React.createClass({
    createUser: function(event) {
        var _this = this;
        ref.createUser({
            email: this.state.email,
            password: this.state.password
        }, function(err, userData) {
            if (err) { alert(err); }
            else {
                console.log(userData);
            }
        });
        event.preventDefault();
        return false;
    },
    getInitialState: function() {
        return { email: "", password: "", confirmPassword: "" };
    },
    handleEmailChange: function(event) {
        this.setState({ 
            email: event.target.value, 
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        });
    },
    handlePasswordChange: function(event) {
        this.setState({ 
            email: this.state.email, 
            password: event.target.value,
            confirmPassword: this.state.confirmPassword 
        });
    },
    handleConfirmPasswordChange: function(event) {
        this.setState({ 
            email: this.state.email,
            password: this.state.password,
            confirmPassword: event.target.value 
        });
    },
    render: function() {
        return <form style={style.inner} className="panel panel-default">
                    <div className="panel-body">
                        <div style={style.title}>Welcome to Vocab</div>
                        <div className="form-group">
                            <label htmlFor="emailInput" className="control-label">E-mail</label>
                            <div className="">
                                <input id="emailInput" 
                                       className="form-control" 
                                       type="text" 
                                       placeholder="Please enter e-mail"
                                       onChange={this.handleEmailChange}></input>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="passwordInput" className="control-label">Password</label>
                            <div className="">
                                <input id="passwordInput" 
                                       className="form-control" 
                                       type="password" 
                                       placeholder="Please enter password" 
                                       onChange={this.handlePasswordChange}></input>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPasswordInput" className="control-label">Confirm Password</label>
                            <div className="">
                                <input id="confirmPasswordInput" 
                                       className="form-control" 
                                       type="password" 
                                       placeholder="Please confirm your password" 
                                       onChange={this.handleConfirmPasswordChange}></input>
                            </div>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary form-control" type="submit" onClick={this.createUser}>Sign-up</button>
                        </div>
                    </div>
                    <div className="panel-footer" style={style.footer}>
                        <div>Already have an account? <a href="#"><span onClick={this.props.switchToLogin}>Login!</span></a></div>
                    </div>
               </form>;
    }
});

var LoginSignupControl = React.createClass({
    getInitialState: function() {
        return { mode: "login" };
    },
    switchToSignup: function() {
        this.setState({ mode: "signup"});
    },
    switchToLogin: function() {
        this.setState({ mode: "login"});
    },
    render: function() {
        var control = this.state.mode === "login" ? 
                        <LoginControl switchToSignup={this.switchToSignup} onSuccess={this.props.onSuccess} /> : 
                        <SignupControl switchToLogin={this.switchToLogin} onSuccess={this.props.onSuccess} />;
        return <div style={style.outer}>
                    <div style={style.middle}>
                        {control}
                    </div>
                </div>;
    }
});

module.exports = LoginSignupControl;