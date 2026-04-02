# mcp-postcodes

MCP server for UK postcode lookups via [postcodes.io](https://postcodes.io/). Free, no auth required.

## Tools

| Tool | Description |
|------|-------------|
| `lookup_postcode` | Get full geographic and administrative details for a UK postcode |
| `nearest_postcodes` | Find the nearest postcodes to a given postcode |
| `validate_postcode` | Check whether a UK postcode is valid |
| `random_postcode` | Get a random valid UK postcode with full details |

## Quickstart (Pipeworx Gateway)

```bash
curl -X POST https://gateway.pipeworx.io/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "postcodes_lookup_postcode",
      "arguments": { "postcode": "SW1A 1AA" }
    },
    "id": 1
  }'
```

## License

MIT
