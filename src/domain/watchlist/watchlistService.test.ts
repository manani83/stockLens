import { beforeEach, describe, expect, it } from "vitest";
import {
  addWatchlistItem,
  clearWatchlist,
  getWatchlistItems,
  isWatchlisted,
  removeWatchlistItem,
} from "./watchlistService";
import { WATCHLIST_STORAGE_KEY } from "./watchlistStorage";

function createLocalStorageMock(): Storage {
  let store: Record<string, string> = {};

  return {
    get length() {
      return Object.keys(store).length;
    },
    clear: () => {
      store = {};
    },
    getItem: (key: string) => store[key] ?? null,
    key: (index: number) => Object.keys(store)[index] ?? null,
    removeItem: (key: string) => {
      delete store[key];
    },
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
  };
}

describe("watchlistService", () => {
  beforeEach(() => {
    const localStorageMock = createLocalStorageMock();

    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      value: localStorageMock,
    });
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        localStorage: localStorageMock,
      },
    });

    localStorage.clear();
  });

  it("관심종목이 없으면 빈 배열 반환", () => {
    expect(getWatchlistItems()).toEqual([]);
  });

  it("관심종목 추가 성공", () => {
    const result = addWatchlistItem("SCHD");

    expect(result.success).toBe(true);
    expect(result.items).toHaveLength(1);
    expect(getWatchlistItems()).toHaveLength(1);
  });

  it("ticker가 대문자로 저장되는지 확인", () => {
    addWatchlistItem("schd");

    expect(getWatchlistItems()[0]?.ticker).toBe("SCHD");
  });

  it("같은 ticker 중복 추가 방지", () => {
    addWatchlistItem("SCHD");
    const result = addWatchlistItem("schd");

    expect(result.success).toBe(false);
    expect(getWatchlistItems()).toHaveLength(1);
  });

  it("ticker 앞뒤 공백 제거", () => {
    addWatchlistItem(" schd ");

    expect(getWatchlistItems()[0]?.ticker).toBe("SCHD");
  });

  it("관심종목 삭제 성공", () => {
    addWatchlistItem("SCHD");
    const result = removeWatchlistItem("schd");

    expect(result.success).toBe(true);
    expect(getWatchlistItems()).toEqual([]);
  });

  it("없는 ticker 삭제 시 실패 결과 반환", () => {
    const result = removeWatchlistItem("SCHD");

    expect(result.success).toBe(false);
    expect(result.message).toBe("관심종목에 없는 티커입니다.");
  });

  it("isWatchlisted 정상 동작", () => {
    addWatchlistItem("SCHD");

    expect(isWatchlisted("schd")).toBe(true);
    expect(isWatchlisted("JEPI")).toBe(false);
  });

  it("clearWatchlist 정상 동작", () => {
    addWatchlistItem("SCHD");
    clearWatchlist();

    expect(getWatchlistItems()).toEqual([]);
  });

  it("localStorage에 잘못된 JSON이 있을 때 빈 배열 반환", () => {
    localStorage.setItem(WATCHLIST_STORAGE_KEY, "{bad json");

    expect(getWatchlistItems()).toEqual([]);
  });
});
