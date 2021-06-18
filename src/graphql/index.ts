import * as apollo from "@apollo/client";

import {
  QueryTypes,
  InitLazyQueryResponse
} from './types';
import * as  schemas from './schemas';

export class ApolloClient {
  client: apollo.ApolloClient<apollo.NormalizedCacheObject>;
  constructor(uri: string) {
    this.client = new apollo.ApolloClient({
      cache: new apollo.InMemoryCache(),
      uri
    });
  }

  initLazyQuery(type: QueryTypes): InitLazyQueryResponse {
    switch (type) {
      case QueryTypes.GET_COUNTRY:
        return this.getLazyQuery(schemas.GET_COUNTRY)
      case QueryTypes.GET_CONTINENT:
        return this.getLazyQuery(schemas.GET_CONTINENT)
    }
  }
  getLazyQuery(schema: apollo.DocumentNode): InitLazyQueryResponse {
    const [getter, { data, loading }] = apollo.useLazyQuery(schema, {
      client: this.client
    })
    return {
      queryGetter: getter,
      data,
      loading,
    }
  }
}