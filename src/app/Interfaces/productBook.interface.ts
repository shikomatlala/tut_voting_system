
import { PageMetadataInterface } from "./pageMetadata.interface"
import { ProductInterface } from "./product.interface"


export interface ProductBookInterface{
  page: {
    pageDetails: PageMetadataInterface,
    page: ProductInterface[]
  }
}

