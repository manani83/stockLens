import { afterEach, describe, expect, it } from "vitest";
import { getSiteUrl } from "./siteUrl";

const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

describe("getSiteUrl", () => {
  afterEach(() => {
    if (originalSiteUrl === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    } else {
      process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
    }
  });

  it("환경변수가 없으면 localhost 기본값을 반환한다", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;

    expect(getSiteUrl()).toBe("http://localhost:3000");
  });

  it("환경변수 값을 사용한다", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://dividend-lab.example.com";

    expect(getSiteUrl()).toBe("https://dividend-lab.example.com");
  });

  it("환경변수 끝의 slash를 제거한다", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://dividend-lab.example.com/";

    expect(getSiteUrl()).toBe("https://dividend-lab.example.com");
  });
});
