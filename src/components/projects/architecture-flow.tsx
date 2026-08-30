const accessibleDescription =
  "A client sends a request to the Express API, which validates it and checks the recommendation cache. A cache hit returns a response directly. A cache miss requests structured output from Gemini, enriches the recommendations with TMDB, caches the completed result, and returns the response.";

function FlowArrow({ label }: { label?: string }) {
  return (
    <div className="architecture-arrow" aria-hidden="true">
      {label ? <span>{label}</span> : null}
      <b>↓</b>
    </div>
  );
}

export function ArchitectureFlow() {
  return (
    <figure className="architecture-figure">
      <div className="architecture-flow" aria-hidden="true">
        <div className="architecture-node">Client</div>
        <FlowArrow />
        <div className="architecture-node">Express API</div>
        <FlowArrow />
        <div className="architecture-node">
          Validation and recommendation cache
        </div>
        <div className="architecture-branches">
          <div className="architecture-branch">
            <FlowArrow label="cache hit" />
            <div className="architecture-node">Response</div>
          </div>
          <div className="architecture-branch">
            <FlowArrow label="cache miss" />
            <div className="architecture-node">Gemini structured output</div>
            <FlowArrow />
            <div className="architecture-node">TMDB enrichment</div>
            <FlowArrow />
            <div className="architecture-node">Cached response</div>
          </div>
        </div>
      </div>
      <figcaption>
        <span className="sr-only">Architecture flow: </span>
        {accessibleDescription}
      </figcaption>
    </figure>
  );
}
