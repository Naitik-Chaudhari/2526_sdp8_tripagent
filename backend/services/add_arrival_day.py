def add_arrival_day(day_zone_strategy: dict, arrival_zone: str) -> dict:
    """
    Adds day_1 as arrival_zone at the beginning
    of day_zone_strategy and returns updated mapping.
    """

    # Create new ordered dictionary
    updated_strategy = {"day_1": arrival_zone}

    # Add existing days
    for key, value in day_zone_strategy.items():
        updated_strategy[key] = value

    return updated_strategy
