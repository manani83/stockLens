import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  ErrorState,
  FormErrorMessage,
  LoadingState,
  NotFoundState,
} from "./index";

describe("common status state components", () => {
  it("ErrorState는 기본 오류 안내와 action link를 렌더링한다", () => {
    const html = renderToStaticMarkup(
      <ErrorState actionHref="/" actionLabel="메인으로 이동" />,
    );

    expect(html).toContain("문제가 발생했습니다.");
    expect(html).toContain("잠시 후 다시 시도해주세요.");
    expect(html).toContain("메인으로 이동");
    expect(html).toContain('href="/"');
  });

  it("NotFoundState는 찾을 수 없는 상태와 action link를 렌더링한다", () => {
    const html = renderToStaticMarkup(
      <NotFoundState actionHref="/rankings" actionLabel="ETF 랭킹 보기" />,
    );

    expect(html).toContain("요청하신 정보를 찾을 수 없습니다.");
    expect(html).toContain("ETF 랭킹 보기");
    expect(html).toContain('href="/rankings"');
  });

  it("FormErrorMessage는 message가 없으면 렌더링하지 않는다", () => {
    expect(renderToStaticMarkup(<FormErrorMessage />)).toBe("");
  });

  it("FormErrorMessage는 접근성 alert로 오류 메시지를 렌더링한다", () => {
    const html = renderToStaticMarkup(<FormErrorMessage message="입력값을 확인해주세요." />);

    expect(html).toContain('role="alert"');
    expect(html).toContain("입력값을 확인해주세요.");
  });

  it("LoadingState는 기본 로딩 문구를 렌더링한다", () => {
    const html = renderToStaticMarkup(<LoadingState />);

    expect(html).toContain("불러오는 중입니다.");
  });
});
