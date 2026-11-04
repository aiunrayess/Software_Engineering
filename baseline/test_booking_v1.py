import copy
import importlib
import os
import unittest

can_book = importlib.import_module(os.environ.get("BOOKING_MODULE", "booking")).can_book

NOW = 540
BASE = [(600, 660)]


class Base(unittest.TestCase):
    def check(self, start, end, expected, now=NOW, blocked=False, existing=None):
        if existing is None:
            existing = [(600, 660)]
        result = can_book(start, end, now, blocked, existing)
        self.assertIs(
            result, expected,
            f"can_book({start}, {end}, {now}, {blocked}, {existing}) -> {result!r}, expected {expected}",
        )


class TestRequiredCases(Base):                      # Task 4 list
    def test_touching_after_existing(self):  self.check(660, 720, True)    # AC4
    def test_overlap(self):                  self.check(630, 690, False)   # AC4
    def test_blocked(self):                  self.check(660, 720, False, blocked=True)  # AC3
    def test_exactly_120(self):              self.check(720, 840, True)    # AC2
    def test_121(self):                      self.check(720, 841, False)   # AC2
    def test_starts_now(self):               self.check(540, 570, False)   # AC1


class TestStartVsNow(Base):
    def test_before_now(self):               self.check(500, 530, False)
    def test_one_minute_after_now(self):     self.check(541, 571, True)


class TestAC1Bounds(Base):
    def test_reversed(self):                 self.check(700, 650, False)
    def test_zero_length(self):              self.check(700, 700, False)
    def test_negative_start(self):           self.check(-10, 30, False, now=0, existing=[])
    def test_start_zero_never_valid(self):   self.check(0, 60, False, now=0, existing=[])
    def test_end_exactly_1440(self):         self.check(1380, 1440, True, now=1300, existing=[])
    def test_end_past_1440(self):            self.check(1400, 1441, False, now=1300, existing=[])
    def test_last_minute_slot(self):         self.check(1439, 1440, True, now=1438, existing=[])
    def test_no_slot_after_last_minute(self):self.check(1439, 1440, False, now=1439, existing=[])


class TestAC4Overlap(Base):
    def test_touching_before_existing(self): self.check(570, 600, True)
    def test_overlap_start_side(self):       self.check(570, 630, False)
    def test_inside_existing(self):          self.check(610, 650, False)
    def test_contains_existing(self):        self.check(590, 670, False)
    def test_identical_to_existing(self):    self.check(600, 660, False)
    def test_empty_existing(self):           self.check(600, 660, True, existing=[])


class TestMultipleBookings(Base):
    M = [(900, 960), (600, 660), (700, 760)]        # deliberately unsorted

    def test_fits_in_gap_touching_both(self):self.check(660, 700, True, existing=self.M)
    def test_overlaps_two(self):             self.check(650, 710, False, existing=self.M)
    def test_overlaps_second_only(self):     self.check(740, 800, False, existing=self.M)
    def test_overlaps_last_only(self):       self.check(920, 940, False, existing=self.M)
    def test_after_all(self):                self.check(960, 1020, True, existing=self.M)
    def test_120_between_bookings(self):     self.check(760, 880, True, existing=self.M)
    def test_gap_too_long(self):             self.check(760, 900, False, existing=self.M)  # 140 min


class TestInputsUnchanged(unittest.TestCase):
    def test_existing_not_modified(self):
        existing = [(900, 960), (600, 660), (700, 760)]
        before = copy.deepcopy(existing)
        for start, end, blocked in [(660, 700, False), (650, 710, False), (660, 700, True), (-5, 10, False)]:
            result = can_book(start, end, 540, blocked, existing)
            self.assertIsInstance(result, bool)
            self.assertEqual(existing, before)


class TestAssumedTypeHandling(Base):                # my assumption A3 – drop if you disagree
    def test_float(self):  self.check(600.5, 660, False, existing=[])
    def test_str(self):    self.check("600", 660, False, existing=[])
    def test_none(self):   self.check(None, 660, False, existing=[])
    def test_bool(self):   self.check(True, 60, False, now=0, existing=[])


if __name__ == "__main__":
    unittest.main()