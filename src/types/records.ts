import { z } from "zod";

// Zod schema for race records validation
export const RaceRecordSchema = z.object({
  Navn: z.string().min(1, "Navn må fylles ut"),
  "Lag/Klubb": z.string(),
  Tid: z.string().regex(/^\d{1,2}:\d{2}:\d{2}$/, "Tid må være i format HH:MM:SS eller H:MM:SS"),
  Klasse: z.string().min(1, "Klasse må fylles ut"),
  År: z.number().int().min(2015).max(2030, "År må være mellom 2015 og 2030"),
});

export const RecordsByGenderSchema = z.object({
  K: z.array(RaceRecordSchema).length(5, "Det må være nøyaktig 5 rekorder for kvinner"),
  M: z.array(RaceRecordSchema).length(5, "Det må være nøyaktig 5 rekorder for menn"),
});

// TypeScript types derived from Zod schemas
export type RaceRecord = z.infer<typeof RaceRecordSchema>;
export type RecordsByGender = z.infer<typeof RecordsByGenderSchema>;

// Validation helper function
export function validateRecords(data: unknown, sourceName: string): RecordsByGender {
  try {
    return RecordsByGenderSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(`❌ Validation error in ${sourceName}:`, error.errors);
      throw new Error(
        `Invalid data in ${sourceName}: ${error.errors.map((e) => `${e.path.join(".")} - ${e.message}`).join(", ")}`
      );
    }
    throw error;
  }
}
