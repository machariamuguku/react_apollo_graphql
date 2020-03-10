// import react
// useState hook (state management in functional components)
// useEffect hook (manage side effects in functional components- componentDidMount e.t.c)
import React, { useState, useEffect } from "react";
// ant design formatting
import { Row, Col, Spin, Button } from "antd";
// graphql tag and useQuery apollo react hook
import { gql, useLazyQuery } from "@apollo/client";
// components
import Person from "./Person";
// button icons
import {
  SearchOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined
} from "@ant-design/icons";

// compose the people query
// with qgl tag and template literals
const GET_SWAPI_PEOPLE = gql`
  query allPersons($first: Int, $after: String, $last: Int, $before: String) {
    allPersons(first: $first, after: $after, last: $last, before: $before) {
      id
      name
      gender
    }
  }
`;

function App() {
  // people state hook with empty array
  const [people, setPeople] = useState([]);
  // pointer to the first item in each successful search
  const [beforeCursor, setBeforeCursor] = useState(null);
  // pointer to the last item in each successful search
  const [afterCursor, setAfterCursor] = useState(null);

  // query the data
  // show loading state
  const [getPeople, { loading, error }] = useLazyQuery(GET_SWAPI_PEOPLE, {
    // use fetch policy to ensure onCompleted fires
    // even if fetching is from the cache (data fetched before) and not the network
    fetchPolicy: "cache-and-network",
    // if there was an error fetching
    // show error alert
    onError: error => {
      alert(error.message);
    },
    // if it completed successfully
    // de-structure appPersons from the response
    // the response is data.allPersons
    onCompleted: ({ allPersons }) => {
      // if there's people found for that query
      // save them to state and
      // save reference to the first and last object in that array
      // to be used as a cursor's to last and first fetched objects
      // else show error
      if (allPersons.length > 0) {
        // set fetched people object to state
        setPeople(allPersons);
        // pointer to id of the first item in each successful search
        setBeforeCursor(allPersons[0].id);
        // pointer to id of the last item in each successful search
        setAfterCursor(allPersons[allPersons.length - 1].id);
      } else {
        alert("No People found for that query");
      }
    }
  });

  useEffect(() => {
    // cleanup after un-mounting component
    return () => {
      setPeople([]);
    };
  }, []); // dependency array (watch change in objects in array to re-render)

  return (
    <Row>
      {/* if loading show spinner */}
      {loading === true && (
        <Col
          span={4}
          offset={3}
          style={{ marginTop: "20%", marginLeft: "50%" }}
        >
          <Spin size="large" />
        </Col>
      )}

      {/* if People successfully fetched show people*/}
      {!loading && !error && people.length > 0 && (
        <Row>
          {people.map((singlePerson, index) => (
            <Col
              xs={{ span: 5, offset: 1 }}
              lg={{ span: 5, offset: 2 }}
              key={index}
            >
              <Person person={singlePerson} />
            </Col>
          ))}
        </Row>
      )}

      {/* action button. Initial fetch */}
      {!loading && !people.length > 0 && (
        <Row style={{ marginTop: "1%", marginLeft: "40%" }}>
          <Col span={4} offset={3}>
            <Button
              type="primary"
              shape="round"
              icon={<SearchOutlined />}
              size="large"
              onClick={() => {
                // call the lazyQuery here
                // passing the query variables as an object
                getPeople({
                  variables: {
                    first: 10,
                    after: afterCursor
                  }
                });
              }}
            >
              Fetch
            </Button>
          </Col>
        </Row>
      )}

      {/* Go Next and Back action buttons */}
      {!loading && !error && people.length > 0 && (
        <Row style={{ marginTop: "40", marginLeft: "40%", marginBottom: "40" }}>
          <Button
            style={{ marginRight: "40px" }}
            type="primary"
            shape="round"
            icon={<ArrowLeftOutlined />}
            size="large"
            onClick={() => {
              //  fetch previous
              // by getting last items before the beforeCursor
              getPeople({
                variables: {
                  last: 10,
                  before: beforeCursor
                }
              });
            }}
          >
            previous
          </Button>
          <Button
            type="primary"
            shape="round"
            icon={<ArrowRightOutlined />}
            size="large"
            onClick={() => {
              //  fetch next
              // by getting first items after the afterCursor
              getPeople({
                variables: {
                  first: 10,
                  after: afterCursor
                }
              });
            }}
          >
            Next
          </Button>
        </Row>
      )}
    </Row>
  );
}

export default App;
