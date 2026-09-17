import React from 'react';
import { loadWhop } from '@whop/elements';
import { Checkout, CheckoutElement, WhopElements } from '@whop/elements-react';
import { OFS_LIVE } from '../../config/offers';
import { trackCTAClick } from '../../utils/analytics';

/* Embedded Whop checkout for OFS Live. The plan below is the embed plan Whop
   generated for the elements SDK (distinct from the hosted checkout link). */
const WHOP_PLAN = 'plan_xAelJXG9Fv4QE';

/* Create the elements handle once, at module load, like Stripe's loadStripe. */
let whopElements = null;
try {
  whopElements = loadWhop();
} catch (e) {
  whopElements = null;
}

/* If the embedded widget can't initialise (blocked origin, offline, etc.), fall
   back to the hosted Whop checkout so the visitor can always complete the join. */
const Fallback = () => (
  <div className="ofs-checkout-fallback">
    <p className="ofs-fine" style={{ marginBottom: 14 }}>
      Opening the secure checkout on Whop.
    </p>
    <a
      href={OFS_LIVE.checkoutUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="ofs-btn ofs-btn--auto"
      onClick={() => trackCTAClick('OFS Live · checkout fallback')}
    >
      Start my free day <span className="ofs-arrow" aria-hidden="true">&rarr;</span>
    </a>
  </div>
);

class Boundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    // Non-fatal: the fallback link keeps checkout available.
    // eslint-disable-next-line no-console
    console.warn('[whop] embedded checkout unavailable, using hosted fallback', error);
  }

  render() {
    return this.state.failed ? <Fallback /> : this.props.children;
  }
}

const EmbeddedCheckout = () => {
  if (!whopElements) return <Fallback />;
  return (
    <Boundary>
      <WhopElements elements={whopElements}>
        <Checkout plan={WHOP_PLAN}>
          <CheckoutElement />
        </Checkout>
      </WhopElements>
    </Boundary>
  );
};

export default EmbeddedCheckout;
