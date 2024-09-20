def calculate_insulin_dosage(total_carbs, insulin_to_carb_ratio):
    return total_carbs / insulin_to_carb_ratio


def calculate_correction_dose(current_blood_sugar, target_blood_sugar, correction_factor):
    blood_sugar_difference = current_blood_sugar - target_blood_sugar
    correction_dose = blood_sugar_difference / correction_factor
    return round(correction_dose)


def calculate_total_insulin(carbs, insulin_to_carb_ratio, current_blood_sugar, target_blood_sugar, correction_factor):
    base_insulin_dosage = calculate_insulin_dosage(carbs, insulin_to_carb_ratio)
    correction_dose = calculate_correction_dose(current_blood_sugar, target_blood_sugar, correction_factor)
    total_insulin_dosage = base_insulin_dosage + correction_dose
    return round(base_insulin_dosage, 2), correction_dose, round(total_insulin_dosage, 2)
