import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ApiResponse } from "@/utils/Response";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        new ApiResponse(400, "Anyone field is empty", [], false)
      );
    }

    const response = await prisma.admin.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!response) {
      return NextResponse.json(
        new ApiResponse(400, "Admin does not exist", [], false)
      );
    }

    return NextResponse.json(
      new ApiResponse(200, "Login successfully", response, true)
    );
  } catch (error) {
    return NextResponse.json(
      new ApiResponse(500, "Unable to resolve the admin function", [], false)
    );
  }
}
