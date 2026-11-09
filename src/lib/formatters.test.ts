import { describe, it, expect } from "vitest";
import {
  formatCurrency,
  formatDate,
  formatMonth,
  getMonthKey,
} from "./formatters";

describe("formatCurrency", () => {
  it("formats a positive amount as USD with two decimals", () => {
    expect(formatCurrency(1234.5)).toBe("$1,234.50");
  });

  it("formats zero", () => {
    expect(formatCurrency(0)).toBe("$0.00");
  });

  it("formats a negative amount", () => {
    expect(formatCurrency(-50)).toBe("-$50.00");
  });
});

describe("formatDate", () => {
  it("formats an ISO date string", () => {
    expect(formatDate("2026-03-15")).toBe("Mar 15, 2026");
  });

  // Regression test for the UTC shift fixed in 1c9998f
  it("does not shift the first of the month to the previous day", () => {
    expect(formatDate("2026-03-01")).toBe("Mar 1, 2026");
  });

  it("handles the last day of the year", () => {
    expect(formatDate("2026-12-31")).toBe("Dec 31, 2026");
  });
});

describe("formatMonth", () => {
  it("formats a full date as month and year", () => {
    expect(formatMonth("2026-03-01")).toBe("March 2026");
  });

  it("formats a month key as month and year", () => {
    expect(formatMonth("2026-03")).toBe("March 2026");
  });
});

describe("getMonthKey", () => {
  it("extracts YYYY-MM from a date string", () => {
    expect(getMonthKey("2026-03-15")).toBe("2026-03");
  });
});
