import tm2015 from "./gallery/TM2015-Gallery.json";
import tm2016 from "./gallery/TM2016-Gallery.json";
import tm2017 from "./gallery/TM2017-Gallery.json";
import tm2018 from "./gallery/TM2018-Gallery.json";
import tm2019 from "./gallery/TM2019-Gallery.json";
import tm2022 from "./gallery/TM2022-Gallery.json";
import tm2023 from "./gallery/TM2023-Gallery.json";
import tm2025 from "./gallery/TM2025-Gallery.json";

import type { GalleryYear } from "../types/gallery";

export const galleriData: GalleryYear[] = [tm2015, tm2016, tm2017, tm2018, tm2019, tm2022, tm2023, tm2025] as GalleryYear[]; // rekkefølge = visningsrekkefølge
