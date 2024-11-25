exports.calculateSuccessRate = (totalPlaced, totalParticipants) => {
    if (totalParticipants > 0) {
      return (totalPlaced / totalParticipants) * 100;
    }
    return 0;
  };
  