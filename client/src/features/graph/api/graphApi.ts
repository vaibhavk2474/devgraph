import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type GraphNode = {
    id: string;
    type: string;
    name: string;
    [key: string]: unknown;
};

export type GraphRelationship = {
    id: string;
    type: string;
    source: string;
    target: string;
};

export type GraphData = {
    nodes: GraphNode[];
    relationships: GraphRelationship[];
};

export const graphApi = createApi({
    reducerPath: "graphApi",

    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/v1",
    }),

    endpoints: (builder) => ({
        getGraph: builder.query<GraphData, void>({
            query: () => "/graph",
        }),
    }),
});

export const { useGetGraphQuery } = graphApi;