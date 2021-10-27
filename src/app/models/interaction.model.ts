type Interaction = {
  herbID: string,
  herbName: string,
  drugID: string,
  drugName: string,
  catID: string,
  catName: string,
  recommendation: string,
  generalInteractionID: string
}

export interface InteractionModel {
  data: Interaction[],
  productId?: string | null,
  productName?: string | null,
  partNo?: string | null
}
