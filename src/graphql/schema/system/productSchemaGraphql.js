const { gql } = require("apollo-server");

const ProductSchemaGraphql = gql`
  input PriceInput {
    idPriceList: ID
    name: String
    price: Float!
  }

  type Price {
    idPriceList: ID
    name: String
    price: Float!
  }

  input TaxInput {
    id: ID
    name: String
    percentage: Float
    description: String
    deductible: Boolean
    status: Boolean
  }

  input CategoryInput {
    id: ID
    name: String
    description: String
  }

  type Category {
    id: ID
    name: String
    description: String
  }

  input InventoryInput {
    unit: String
    availableQuantity: Float
    unitCost: Float
    initialQuantity: Float
    warehouses: [WarehouseInput]
  }

  type Inventory {
    unit: Unit
    availableQuantity: Float
    unitCost: Float
    initialQuantity: Float
    warehouses: [Warehouse]
  }

  type Tax {
    id: ID
    name: String
    percentage: Float
    description: String
    deductible: Boolean
    status: Boolean
  }

  input CustomFieldInput {
    key: String
    value: String
  }

  type CustomField {
    key: String
    value: String
  }

  type Product {
    code: String!
    barCode: String
    name: String!
    description: String
    lastPurchase: Date
    status: Boolean
    price: [Price]
    tax: [Tax]
    category: Category
    inventory: Inventory
    customField: [CustomField]
    fromSync: Boolean
    images: [String]
  }

  input ProductInput {
    code: String
    barCode: String
    name: String
    description: String
    lastPurchase: Date
    status: Boolean
    price: [PriceInput]
    tax: [TaxInput]
    category: CategoryInput
    inventory: InventoryInput
    customField: [CustomFieldInput]
    fromSync: Boolean
    images: [Upload]
  }
`;

module.exports = ProductSchemaGraphql;
