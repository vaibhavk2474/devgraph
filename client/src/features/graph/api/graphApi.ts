import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type GraphNode = {
    id: string;
    type: "Developer" | "Project" | "Company" | "Technology";
    name: string;

    role?: string;
    description?: string;
    category?: string;
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

export type GraphSearchResult = GraphNode;

export type GraphSearchResponse = {
    results: GraphSearchResult[];
};

export type GraphPathResponse = {
    connected: boolean;
    nodes: GraphNode[];
    relationships: GraphRelationship[];
};

export const graphApi = createApi({
    reducerPath: "graphApi",

    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1",
    }),

    endpoints: (builder) => ({
        getGraph: builder.query<GraphData, void>({
            query: () => "/graph",
        }),
        searchGraph: builder.query<GraphSearchResponse, string>({
            query: (query) => ({
                url: "/graph/search",
                params: {
                    q: query,
                },
            }),
        }),
        getFocusedGraph: builder.query<GraphData, string>({
            query: (nodeId) => `/graph/${nodeId}`,
        }),
        findGraphPath: builder.query<
            GraphPathResponse,
            { from: string; to: string }
        >({
            query: ({ from, to }) => ({
                url: "/graph/path",
                params: {
                    from,
                    to,
                },
            }),
        }),
    }),


});

export const { useGetGraphQuery, useSearchGraphQuery, useGetFocusedGraphQuery, useLazyGetFocusedGraphQuery, useLazyFindGraphPathQuery } = graphApi;