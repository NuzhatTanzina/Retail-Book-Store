import InnerPageContainer from "../pages/components/common/InnerPageContainer";
import _Layout from "./components/layout/_layout";

export default function Page() {
  return (
    <_Layout>
      <InnerPageContainer title="About Us">
        <p>
         
        We sell a wide range of books, 
        from old favorites to new hits, 
        making sure there's something for everyone. 
        Our website is easy to use, letting you find 
        and buy books without any trouble.
        </p>
        <p className="mt-8">
        When you shop with us, you can pay
         securely and expect your books to arrive quickly. 
        And if you need help, we're here to make sure
        you're happy with your purchase.

        </p>
        <p className="mt-8"></p>
      </InnerPageContainer>
    </_Layout>
  );
}