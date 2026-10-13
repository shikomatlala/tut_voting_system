
import { PageMetadataInterface } from "./pageMetadata.interface"
import { ProductInterface } from "./product.interface"


export interface ProductBookInterface{
  page: {
    pageDetails: PageMetadataInterface,
    pageData: ProductInterface[]
  }
}

