import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import axios from "axios";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // CORSプリフライトリクエストへの対応
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POSGT",
      },
      body: "",
    };
  }
  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const trackingNumber = body.tracking_number;

    if (!trackingNumber) {
      throw new Error("追跡番号が見つかりません");
    }
    //Ship&Co APIへのリクエスト（注文を発送済みに更新する）
    //注：実際のエンドポイントやメソッドは要調整
    const response = await axios.post(
      `https://api.shipandco.com/v1/shipments/fulfill`,
      { tracking_number: trackingNumber },
      {
        headers: {
          "x-access-token": "SHIPANDCO_API_TOKEN",
          "Content-Type": "application/json",
        },
      },
    );
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({
        message: "発送完了処理に成功しました",
        date: response.data,
      }),
    };
  } catch (error: any) {
    console.error(error);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({
        message: "エラーが発生しました",
        error: error.message,
      }),
    };
  }
};
