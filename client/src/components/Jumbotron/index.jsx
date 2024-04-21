// Used for future functionality when Checkout is implemented with Stripe and successfully paid
// Used for Success page
function Jumbotron({ children }) {
    return (
      <div
        style={{ height: 560, clear: "both", paddingTop: 120, textAlign: "center" }}
      >
        {children}
      </div>
    );
  }
  
  export default Jumbotron;