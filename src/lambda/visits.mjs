import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand, GetCommand } from '@aws-sdk/lib-dynamodb';

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const TABLE = process.env.TABLE_NAME;

// Contador global de la web: una sola fila en la tabla, no recibe ningún dato del visitante.
const KEY = { counter_id: 'total' };

export const handler = async (event) => {
  try {
    if (event.requestContext.http.method === 'POST') {
      const result = await client.send(new UpdateCommand({
        TableName: TABLE,
        Key: KEY,
        UpdateExpression: 'ADD visit_count :inc',
        ExpressionAttributeValues: { ':inc': 1 },
        ReturnValues: 'UPDATED_NEW',
      }));
      return response(200, { count: result.Attributes.visit_count });
    }

    const result = await client.send(new GetCommand({ TableName: TABLE, Key: KEY }));
    return response(200, { count: result.Item?.visit_count ?? 0 });
  } catch (error) {
    console.error('DynamoDB error:', error);
    return response(500, { error: 'Internal server error' });
  }
};

const response = (statusCode, body) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});
