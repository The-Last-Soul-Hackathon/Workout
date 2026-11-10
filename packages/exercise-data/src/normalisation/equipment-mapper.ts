// Equipment Normalisation Engine

const EQUIPMENT_SYNONYM_MAP: Record<string, string> = {
  'body weight': 'bodyweight',
  'bodyweight': 'bodyweight',
  'none': 'bodyweight',
  'calisthenics': 'bodyweight',
  'floor': 'bodyweight',
  'mat': 'bodyweight',
  'pull-up bar': 'pull_up_bar',
  'pull up bar': 'pull_up_bar',
  'chin-up bar': 'pull_up_bar',
  'overhead bar': 'pull_up_bar',
  'parallel bars': 'dip_station',
  'dip bars': 'dip_station',
  'dip station': 'dip_station',
  'wall': 'wall',
  'staircase': 'stairs',
  'stairs': 'stairs',
  'box': 'box_bench',
  'bench': 'box_bench',
  'chair': 'box_bench',
  'step': 'box_bench',
  'towel': 'towel_strap',
  'strap': 'towel_strap',
  'rope': 'jump_rope',
  'jump rope': 'jump_rope',
};

export class EquipmentMapper {
  public static normalize(equipmentInput: string | string[]): string[] {
    const list = Array.isArray(equipmentInput) ? equipmentInput : [equipmentInput];
    const normalizedSet = new Set<string>();

    for (const item of list) {
      if (!item) continue;
      const key = item.trim().toLowerCase();
      const mapped = EQUIPMENT_SYNONYM_MAP[key] || key.replace(/[\s-]+/g, '_');
      normalizedSet.add(mapped);
    }

    if (normalizedSet.size === 0) {
      normalizedSet.add('bodyweight');
    }

    return Array.from(normalizedSet);
  }
}
