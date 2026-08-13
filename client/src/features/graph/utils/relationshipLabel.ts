const relationshipLabels: Record<string, string> = {
    WORKED_ON: "Worked on",
    WORKED_AT: "Worked at",
    USES: "Uses",
    RELATED_TO: "Related to",
};

export function getRelationshipLabel(type: string): string {
    return relationshipLabels[type] ?? type;
}