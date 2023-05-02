package entity

import (
	"testing"
	"time"
)

func TestNotification(t *testing.T) {
	now := time.Now()
	n := &Notification{
		ID:        1,
		Recipient: "John",
		Message:   "Hello World!",
		IsRead:    false,
		Timestamp: now,
	}

	if n.ID != 1 {
		t.Errorf("expected ID to be 1, but got %d", n.ID)
	}

	if n.Recipient != "John" {
		t.Errorf("expected Recipient to be John, but got %s", n.Recipient)
	}

	if n.Message != "Hello World!" {
		t.Errorf("expected Message to be Hello World!, but got %s", n.Message)
	}

	if n.IsRead != false {
		t.Errorf("expected IsRead to be false, but got %v", n.IsRead)
	}

	if n.Timestamp != now {
		t.Errorf("expected Timestamp to be %v, but got %v", now, n.Timestamp)
	}
}
