import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { mockJobDescriptions } from "@/data/mockData";
import { JdCard } from "./JdCard";

vi.mock("@tanstack/react-router", async () => {
	const actual = await vi.importActual("@tanstack/react-router");
	return {
		...actual,
		Link: ({ children, ...props }: any) => <a {...props}>{children}</a>,
	};
});

describe("JdCard", () => {
	it("renders job details correctly in grid view", () => {
		const job = mockJobDescriptions[0];
		render(<JdCard job={job} viewMode="grid" />);

		expect(screen.getByText(job.title)).toBeTruthy();
		expect(screen.getByText(job.company)).toBeTruthy();
		expect(screen.getByText(job.location)).toBeTruthy();

		if (job.hasResume) {
			expect(screen.getByText("View Resume")).toBeTruthy();
		}
	});

	it("renders job details correctly in list view", () => {
		const job = mockJobDescriptions[0];
		render(<JdCard job={job} viewMode="list" />);

		expect(screen.getByText(job.title)).toBeTruthy();
		expect(screen.getByText(job.company)).toBeTruthy();
		expect(screen.getByText(job.location)).toBeTruthy();
	});

	it('renders "No Resume" button when resume is missing', () => {
		const job = mockJobDescriptions.find((j) => !j.hasResume);
		if (!job) throw new Error("No job without resume found in mock data");

		render(<JdCard job={job} viewMode="grid" />);

		expect(screen.getByText("No Resume")).toBeTruthy();
	});
});
