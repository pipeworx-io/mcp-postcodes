/**
 * Postcodes MCP — wraps postcodes.io UK postcode API (free, no auth)
 *
 * Tools:
 * - lookup_postcode: Get full details for a UK postcode
 * - nearest_postcodes: Find the nearest postcodes to a given UK postcode
 * - validate_postcode: Check whether a UK postcode is valid
 * - random_postcode: Get a random valid UK postcode with full details
 */

interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

const BASE_URL = 'https://api.postcodes.io';

type RawPostcodeResult = {
  postcode: string;
  quality: number;
  eastings: number | null;
  northings: number | null;
  country: string;
  nhs_ha: string | null;
  longitude: number | null;
  latitude: number | null;
  european_electoral_region: string | null;
  primary_care_trust: string | null;
  region: string | null;
  lsoa: string | null;
  msoa: string | null;
  incode: string;
  outcode: string;
  parliamentary_constituency: string | null;
  parliamentary_constituency_2024: string | null;
  admin_district: string | null;
  parish: string | null;
  date_of_introduction: string | null;
  admin_ward: string | null;
  ced: string | null;
  ccg: string | null;
  nuts: string | null;
  pfa: string | null;
  codes: Record<string, string>;
};

type RawResponse<T> = {
  status: number;
  result: T;
};

function formatPostcode(r: RawPostcodeResult) {
  return {
    postcode: r.postcode,
    incode: r.incode,
    outcode: r.outcode,
    country: r.country,
    region: r.region,
    admin_district: r.admin_district,
    admin_ward: r.admin_ward,
    parliamentary_constituency: r.parliamentary_constituency,
    lat: r.latitude,
    lon: r.longitude,
    eastings: r.eastings,
    northings: r.northings,
    codes: r.codes,
  };
}

const tools: McpToolExport['tools'] = [
  {
    name: 'lookup_postcode',
    description: 'Get full geographic and administrative details for a UK postcode.',
    inputSchema: {
      type: 'object',
      properties: {
        postcode: {
          type: 'string',
          description: 'UK postcode to look up (e.g. "SW1A 1AA" or "SW1A1AA").',
        },
      },
      required: ['postcode'],
    },
  },
  {
    name: 'nearest_postcodes',
    description: 'Find the nearest UK postcodes to a given postcode.',
    inputSchema: {
      type: 'object',
      properties: {
        postcode: {
          type: 'string',
          description: 'UK postcode to find neighbours for (e.g. "SW1A 1AA").',
        },
      },
      required: ['postcode'],
    },
  },
  {
    name: 'validate_postcode',
    description: 'Check whether a UK postcode is valid.',
    inputSchema: {
      type: 'object',
      properties: {
        postcode: {
          type: 'string',
          description: 'UK postcode to validate (e.g. "SW1A 1AA").',
        },
      },
      required: ['postcode'],
    },
  },
  {
    name: 'random_postcode',
    description: 'Get a random valid UK postcode with full geographic and administrative details.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'lookup_postcode':
      return lookupPostcode(args.postcode as string);
    case 'nearest_postcodes':
      return nearestPostcodes(args.postcode as string);
    case 'validate_postcode':
      return validatePostcode(args.postcode as string);
    case 'random_postcode':
      return randomPostcode();
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function lookupPostcode(postcode: string) {
  const res = await fetch(`${BASE_URL}/postcodes/${encodeURIComponent(postcode)}`);
  if (!res.ok) throw new Error(`Postcodes.io API error: ${res.status}`);

  const data = (await res.json()) as RawResponse<RawPostcodeResult>;
  return formatPostcode(data.result);
}

async function nearestPostcodes(postcode: string) {
  const res = await fetch(`${BASE_URL}/postcodes/${encodeURIComponent(postcode)}/nearest`);
  if (!res.ok) throw new Error(`Postcodes.io API error: ${res.status}`);

  const data = (await res.json()) as RawResponse<RawPostcodeResult[]>;
  return { results: data.result.map(formatPostcode) };
}

async function validatePostcode(postcode: string) {
  const res = await fetch(`${BASE_URL}/postcodes/${encodeURIComponent(postcode)}/validate`);
  if (!res.ok) throw new Error(`Postcodes.io API error: ${res.status}`);

  const data = (await res.json()) as RawResponse<boolean>;
  return { postcode, valid: data.result };
}

async function randomPostcode() {
  const res = await fetch(`${BASE_URL}/random/postcodes`);
  if (!res.ok) throw new Error(`Postcodes.io API error: ${res.status}`);

  const data = (await res.json()) as RawResponse<RawPostcodeResult>;
  return formatPostcode(data.result);
}

export default { tools, callTool } satisfies McpToolExport;
