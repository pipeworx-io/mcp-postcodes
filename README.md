# mcp-postcodes

Postcodes MCP — wraps postcodes.io UK postcode API (free, no auth)

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 673+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `lookup_postcode` | Get geographic details for a UK postcode (e.g., \'SW1A 1AA\'). Returns coordinates, region, district, ward, and constituency. |
| `nearest_postcodes` | Find nearby UK postcodes sorted by distance from a given postcode (e.g., \'SW1A 1AA\'). Returns list with coordinates. |
| `validate_postcode` | Validate a UK postcode format (e.g., \'SW1A 1AA\'). Returns whether it\'s valid and format details. |
| `random_postcode` | Get a random valid UK postcode with full geographic details. Returns coordinates, region, district, ward, and constituency. |

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "postcodes": {
      "url": "https://gateway.pipeworx.io/postcodes/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 673+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Postcodes data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [All tools and guides](https://github.com/pipeworx-io/examples)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
