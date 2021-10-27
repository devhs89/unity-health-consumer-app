export type ReportModel = {
  id: string,
  title: string,
  studyAim?: null,
  studyDesign?: null,
  commentsOnEvidence?: null,
  results?: null,
  discussion?: null,
  implication?: null,
  assayMethods?: null,
  pharmacokineticMethods?: null,
  statisticalMethods?: null,
  resultsDetails?: null,
  discussionDetails?: null,
  citation?: null | {
    "id": number | string,
    "refCode": string,
    "citation": string
  }
}
