import * as graphqlService from "../graphql";
import Country from "../country/country";
import Continent from "../continent/continent";

const API_URI =
  process.env.REACT_APP_COUNTRIES_BASE_URL ??
  "https://countries.trevorblades.com";
const apolloClient = new graphqlService.ApolloClient(API_URI);

const App = () => (
  <div className="container">
    <Country apolloClient={apolloClient} />
    <Continent apolloClient={apolloClient} />
  </div>
);

export default App;
